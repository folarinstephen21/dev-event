"use server"

import Event from "@/database/event.model"
import connectDB from "@/lib/mongodb"

export const getSimilarEventBySlug = async (slug: string ) => {
    try {
        await connectDB();

        const event = await Event.findOne({slug})


         if (!event) {
           throw new Error("Event not found");
           // or return { error: "Not found" };
         }
        //  lean method was chained so as to handle obj from mongoose properly
        // They behave differently from normal JS obj 
        return await Event.find({_id: { $ne: event._id}, tags: {$in: event.tags}}).lean();

        
    } catch {
        return[]
    }
}