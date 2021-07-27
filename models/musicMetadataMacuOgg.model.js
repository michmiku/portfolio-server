const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const musicMetadataOggSchema = new Schema(
  {
    file: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: false,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    rawDuration: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const MusicMetadataOgg = mongoose.model(
  "MusicMetadataMacuOgg",
  musicMetadataOggSchema
);

module.exports = MusicMetadataOgg;
