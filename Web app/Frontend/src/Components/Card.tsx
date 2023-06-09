import Link from "next/link";
import { Fragment } from "react";

export const Card = ({
  href,
  DataPoint,
  DataName,
}: {
  href: any;
  DataPoint: any[];
  DataName: any;
}) => {
  const { value, createdat }: { value: any; createdat: Date } = DataPoint.find(
    (data) => data.value !== null
  );
  return (
    <Fragment>
      <div className="relative h-44 overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer hover:bg-slate-200">
        <Link href={href}>
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-center text-lg font-medium capitalize leading-6 text-gray-900">
              {DataName}
            </h3>
            <p className="color mt-1 max-w-2xl text-center text-6xl font-medium text-gray-700">
              {" "}
              {value}
            </p>
            <div className="absolute bottom-0 right-0 px-6 pt-4">
              {/* <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"></span> */}
            </div>
            {/* <div className="absolute bottom-0 left-0 px-6 py-4">
            </div> */}
            <p className="absolute bottom-0 mb-4 max-w-2xl text-center text-sm text-gray-700">
              Latest Update:{" "}
              <span className="font-bold">
                {createdat.toUTCString().replace("GMT", "")}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};
