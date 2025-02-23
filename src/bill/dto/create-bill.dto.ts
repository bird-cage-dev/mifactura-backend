import { IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateBillDto {
    @IsString()
    public readonly identificationOwner: string;

    @IsString()
    public readonly concept: string;

    @IsNumberString()
    public readonly amount: number;

    @IsString()
    public readonly type: string;

    @IsString()
    public readonly provider: string;

    @IsString()
    @IsOptional()
    public readonly observations?: string;

    
}

// concept      String
//   image        String
//   amount       Float
//   // type      BillType
//   type         String
//   provider     String
//   observations String?
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//   owner        User     @relation(fields: [ownerId], references: [id])
//   ownerId      String   @db.ObjectId