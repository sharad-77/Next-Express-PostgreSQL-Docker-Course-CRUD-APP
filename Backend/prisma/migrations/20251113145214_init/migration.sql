-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "courseHighlight" TEXT[],

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
