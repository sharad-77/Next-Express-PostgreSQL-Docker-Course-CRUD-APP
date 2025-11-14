import { Request, Response } from "express";
import { prisma } from '../lib/prisma';

export const NewCourseController = async (req:Request, res:Response) => {
  try{
    const { title,price,shortDescription,courseHighlight } = req.body as {
    title: string,
    price: string,
    shortDescription: string,
    courseHighlight: Array<string>
  }

  const newCourse = await prisma.course.create({
    data: {
      title,
      price,
      shortDescription,
      courseHighlight
    }
  })

  res.status(201).json({ mesaage : 'Coruse Created Successfully', course: newCourse});

  } catch(error) {
    console.error("something went wrong",error);
    res.status(500).json({error})
  }
}

export const AllCourseController = async (req:Request, res:Response) => {
  try{
    const course = await prisma.course.findMany();

    res.status(200).json({
      message:"All Course Fetched Successfully",
      data: course,
    });

  } catch(error) {
    console.error(error);
    res.status(501).json({ message: "someting went wrong" });
  }
}

export const DetailCourseController = async (req:Request, res:Response) => {
  try{
    const courseId = Number(req.params.id);

    if (isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid course id" });
    }

    const DetailCourse = await prisma.course.findUnique({
      where: { id : courseId }
    });

    res.json({ message : "Here Is The Details About Course" , DetailCourse });
  } catch(error) {
    console.error(error);
    res.json({message:error})
  }
}
