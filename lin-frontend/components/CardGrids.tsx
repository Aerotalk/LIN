import React from "react";
import { Card } from "./ui/card";
import { CardData } from "@/lib/types";
import Image from "next/image";

const CardGrids = ({
  cardsData,
  colsNoMdScreen,
}: {
  cardsData: CardData[];
  colsNoMdScreen: number;
}) => {
  return (
    <div
      className={`grid md:grid-cols-${colsNoMdScreen} grid-cols-1 gap-6 w-full my-8`}
    >
      {cardsData.map((card, index) => (
        <Card key={index} className="bg-secondary rounded-lg shadow-md p-6">
          <div className="flex flex-col justify-center items-center text-center space-y-3">
            <Image
              src={card.iconImg}
              width={100}
              height={100}
              alt="Icon 4"
              className="h-10 w-10"
            />
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-gray-600 text-base antialiased text-wrap">
              {card.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardGrids;
