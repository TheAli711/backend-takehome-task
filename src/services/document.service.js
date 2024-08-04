const { Document } = require("../models/doc.model");
const { Interaction } = require("../models/interaction.model");

const getUnweightedDocs = async (search, page, size) => {
  const query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  const count = await Document.countDocuments(query);
  const result = await Document.find(query, {
    projection: { _id: 0, __v: 0 },
  })
    .skip((page - 1) * size)
    .limit(size);
  return {
    total: count,
    currentPage: page,
    size,
    totalPages: Math.ceil(count / size),
    data: result,
  };
};

const getWeightedDocs = async (search, page, size) => {
  // Takes about 9 seconds to run
  const docs = await getSortedDocumentsByInteractionsWithoutAggregation(
    search,
    page,
    size
  );

  // Takes about 20 seconds to run
  // const docs = await getSortedDocumentsByInteractionsWithAggregation(
  //   search,
  //   page,
  //   size
  // );
  const query = {};
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }
  const count = await Document.countDocuments(query);
  return {
    total: count,
    currentPage: page,
    size,
    totalPages: Math.ceil(count / size),
    data: docs,
  };
};

const getSortedDocumentsByInteractionsWithAggregation = async (
  searchTitle,
  page,
  limit
) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "interactions",
          localField: "id",
          foreignField: "docId",
          as: "interactions",
        },
      },
      {
        $addFields: {
          interactionCount: { $size: "$interactions" },
          interactions: { $slice: ["$interactions", 5] },
        },
      },
      {
        $sort: {
          interactionCount: -1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ];

    if (searchTitle) {
      pipeline.unshift({
        $match: {
          title: { $regex: searchTitle, $options: "i" },
        },
      });
    }

    const sortedDocuments = await Document.aggregate(pipeline);

    return sortedDocuments;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getSortedDocumentsByInteractionsWithoutAggregation = async (
  searchTitle,
  page,
  limit
) => {
  try {
    const matchQuery = searchTitle
      ? { title: { $regex: searchTitle, $options: "i" } }
      : {};

    const documents = await Document.find(matchQuery).exec();

    const documentsWithInteractionCount = await Promise.all(
      documents.map(async (doc) => {
        const interactions = await Interaction.find({ docId: doc.id })
          .limit(5)
          .exec();
        const interactionCount = await Interaction.countDocuments({
          docId: doc.id,
        }).exec();
        return {
          ...doc.toObject(),
          interactions,
          interactionCount,
        };
      })
    );

    documentsWithInteractionCount.sort(
      (a, b) => b.interactionCount - a.interactionCount
    );

    const startIndex = (page - 1) * limit;
    const paginatedDocuments = documentsWithInteractionCount.slice(
      startIndex,
      startIndex + limit
    );

    return paginatedDocuments;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { getUnweightedDocs, getWeightedDocs };
