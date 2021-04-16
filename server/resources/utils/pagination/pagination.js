const paginatedResults = (model, populate) => async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    if (page < 1) throw new Error("The page no must be greater than 0");

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    let size = await model.find().countDocuments().exec();
    results.limit = limit;
    results.totalCount = size;
    results.maxPage = Math.ceil(size / limit);
    results.currentPage = page;
    if (size > limit) {
      if (endIndex < size) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        let maxPage = Math.ceil(size / limit);
        results.prev = {
          page: maxPage < page ? maxPage : page - 1,
          limit: limit,
        };
      }
    }
    let currenInfo =
      size > limit
        ? await model
            .find({}, { _id: 0 })
            .populate(populate)
            .limit(limit)
            .skip(startIndex)
            .exec()
        : await model.find({}, { _id: 0 }).populate(populate).exec();
    results.current = currenInfo;
    res.pagination = results;
    next();
  } catch (e) {
    res.status(500).json({ error: true, message: e.message });
  }
};

module.exports = { paginatedResults };
