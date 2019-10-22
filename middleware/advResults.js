const advResult = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query };
  // FIelds to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(doc => delete reqQuery[doc]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  let query = model.find(JSON.parse(queryStr));
  // SELECT FIELDS
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  }
  // Sort
  if (req.query.sort) {
    const fields = req.query.sort.split(',').join(' ');
    query = query.sort(fields);
  } else {
    query = query.sort('-createdAt');
  }
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);
  if (populate) {
    query = query.populate(populate);
  }
  const response = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.pre = {
      page: page - 1,
      limit
    };
  }
  res.advResult = {
    success: true,
    count: response.length,
    pagination,
    data: response
  };
  next();
};
module.exports = advResult;
