-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_photoId_userId_key" ON "Like"("photoId", "userId");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
