-- CreateTable
CREATE TABLE "Patient" (
    "patientId" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_id_key" ON "Patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");
