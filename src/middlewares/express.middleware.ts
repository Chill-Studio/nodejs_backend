import mongoose from "mongoose";
/**
 * This function is a middleware function used by our Express server.
 * In case we need an ID (read, delete or update), it will check if our ID is valid BEFORE
 * calling our controller or anything.
 */
function checkMongooseParamsIDIsValid(req, res, next) {
  if (req.params?._id) {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
      next();
    } else {
      return res.send({});
    }
  } else {
    next();
  }
}

export { checkMongooseParamsIDIsValid };
