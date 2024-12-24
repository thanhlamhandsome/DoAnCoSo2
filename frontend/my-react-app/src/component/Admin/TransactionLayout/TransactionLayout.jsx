import React, { Suspense, useState } from "react";
import TransactionChild from "./TransactionChild";
import { Await, useLoaderData } from "react-router-dom";
import Loader from "../../Root/Loader";
const TransactionLayout = () => {
  const { loaderTransaction } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={loaderTransaction}>
        {(data) => (
          <div className="space-y-4">
            {data.map((transaction) => (
              <TransactionChild
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        )}
      </Await>
    </Suspense>
  );
};




export default TransactionLayout;
