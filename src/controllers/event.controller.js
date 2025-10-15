import prisma from '../utils.js/db.js'
import { isvaildate, isvaildcapasity } from '../utils.js/validator.js'



export const createEvent = async(req,res) => {
    try{
      const {title,dateTime,location,capacity} = req.body
       
      if(!title || !dateTime || !location || !capacity){
        return res.status(400).json({msg:"all fields are required"})
      }
      if(!isvaildcapasity(capacity)){
        return res.status(400).json({msg:"capacity should be greater than 0 or less than 1000"})
      }
      if(!isvaildate(dateTime)){
        return res.status(400).json({msg:"date should be greater than current date"})
      }
    const event = await prisma.event.create(
        {
            data: {
                title,
                dateTime:new Date(dateTime),
                location,
                capacity
            }
        }
    )
    res.status(201).json(event)
    }
    
    catch(err){
        console.log(err)
        res.status(500).json({msg:"server error"})
    }

}
export const getEvents = async(req,res) => {
    try{
        const {id} = req.params
         const events =await prisma.event.findMany({
             where:{id:parseInt(id)},
             include:{registration:{include:{user:true}}}
         })
         const registeredUsers = events?.registration?.map(r => r.user)
        res.json({...events,registeredUsers})
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:"server error"})
    }
}

export const registerEvent = async(req,res)=>{
    const {userId,eventId} = req.body
    try{
        const user = await prisma.user.findUnique({
            where:{id:parseInt(userId)}
        })
        const event = await prisma.event.findUnique({
            where:{id:parseInt(eventId)}
        })
        if(!user || !event){
            return res.status(404).json({msg:"user or event not found"})
        }
        const existing = await prisma.registration.findUnique({ where: { userId_eventId: { userId, eventId } } });
    if (existing) return res.status(400).json({ message: "User already registered" });

        const registration = await prisma.registration.create({
            data:{user:{connect:{id:parseInt(userId)}},event:{connect:{id:parseInt(eventId)}}}
        })
        res.status(201).json(registration)
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:"server error"})
    }
}
export const cancelRegistration = async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const deleted = await prisma.registration.deleteMany({ where: { eventId, userId } });
    if (deleted.count === 0) return res.status(404).json({ message: "User not registered for this event" });
    res.json({ message: "Registration cancelled" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listUpcomingEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { dateTime: { gt: new Date() } },
      orderBy: [
        { dateTime: "asc" },
        { location: "asc" },
      ],
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEventStats = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: { registration: true },
    });
    if (!event) return res.status(404).json({ message: "Event not found" });

    const totalRegs = event.registration.length;
    const remaining = event.capacity - totalRegs;
    const percentage = ((totalRegs / event.capacity) * 100).toFixed(2);

    res.json({ totalRegistrations: totalRegs, remainingCapacity: remaining, percentageUsed: percentage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};