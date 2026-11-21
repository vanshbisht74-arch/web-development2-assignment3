const Product = require('../models/Product');

// 1. Create Product
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// 2. Get All Products (with Pagination, Filtering, Search, Sorting)
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, search, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (error) {
    next(error);
  }
};

// 3. Get Low Stock Report
exports.getLowStockProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ $expr: { $lte: ['$quantity', '$reorderLevel'] } });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// 4. Get Category Summary (Aggregation)
exports.getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
          avgPrice: { $avg: '$price' },
        },
      },
    ]);
    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

// 5. Get Single Product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// 6. Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// 7. Safe Stock Adjustment (PATCH)
exports.adjustStock = async (req, res, next) => {
  try {
    const { change } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.quantity += Number(change);
    if (product.quantity < 0) return res.status(400).json({ message: 'Stock cannot be negative' });

    await product.save();
    res.status(200).json({ message: 'Stock adjusted successfully', product });
  } catch (error) {
    next(error);
  }
};

// 8. Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};