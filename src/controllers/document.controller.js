const { catchAsync } = require("../utils");
const documentService = require("../services/document.service.js");

const getDocsUnAuth = catchAsync(async (req, res) => {
  const { search, page, size } = req.query;

  const documents = await documentService.getUnweightedDocs(
    search || null,
    page > 1 ? page : 1,
    size > 10 ? size : 10
  );
  res.json(documents);
});

const getDocsAuth = catchAsync(async (req, res) => {
  const { search, page, size } = req.query;

  const documents = await documentService.getWeightedDocs(
    search || null,
    page > 1 ? page : 1,
    size > 10 ? size : 10
  );
  res.json(documents);
});

module.exports = { getDocsUnAuth, getDocsAuth };
