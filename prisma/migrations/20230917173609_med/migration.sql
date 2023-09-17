-- CreateTable
CREATE TABLE "Medicine" (
    "medId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "descr" TEXT NOT NULL,
    "diseases" TEXT NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("medId")
);

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
