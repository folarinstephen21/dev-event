import { Schema, model, models, Document, Model, Types } from "mongoose";
import Event from "./event.model";

/**
 * Interface representing the Booking document
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
  },
  { timestamps: true },
);

/**
 * Pre-save hook to verify Event existence
 * Using an async function without 'next' avoids the SaveOptions type conflict.
 */
BookingSchema.pre<IBooking>("save", async function () {
  // Only check if eventId is new or modified
  if (this.isModified("eventId")) {
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      // Throwing an error inside an async pre-hook
      // automatically triggers Mongoose's error handling.
      throw new Error("Reference Error: The associated event does not exist.");
    }
  }
});

// Safeguard against model re-compilation in Next.js
const Booking =
  (models.Booking as Model<IBooking>) ||
  model<IBooking>("Booking", BookingSchema);

export default Booking;
