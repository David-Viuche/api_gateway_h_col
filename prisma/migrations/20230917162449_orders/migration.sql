-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "dateId" INTEGER NOT NULL,
    "descr" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "specialty" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "Appointment"("dateId") ON DELETE RESTRICT ON UPDATE CASCADE;
