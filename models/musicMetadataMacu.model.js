const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const musicMetadataSchema = new Schema(
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

const MusicMetadata = mongoose.model("MusicMetadataMacu", musicMetadataSchema);

module.exports = MusicMetadata;
