import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-40" : "w-60 "
        } flex h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c] p-3 shadow duration-300`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">AgriData</h2>
            <button onClick={() => setOpen(!open)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ul className="space-y-1 pb-4 pt-2 text-sm">
              <li className="rounded-sm">
                <a
                  href="/"
                  className="flex items-center space-x-3 rounded-md p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    viewBox="0 0 1024 1024"
                    stroke="currentColor"
                    strokeWidth={2}
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      d="M713.664 832H310.208L182.4 959.936 128 905.6 201.6 832H64V64h896v768h-137.664l73.6 73.6-54.336 54.336L713.664 832zM140.8 140.8v614.4h742.4V140.8H140.8zM281.6 256h76.8v384H281.6V256z m384 192h76.8v192h-76.8V448z m-192-96h76.8V640H473.6V352z"
                      fill="#ffffff"
                    />
                  </svg>
                  <span className="text-gray-100">Overview</span>
                </a>
              </li>
              <li className="rounded-sm">
                <a
                  href="/map"
                  className="flex items-center space-x-3 rounded-md p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="white"
                    viewBox="0 0 512 512"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M255.998,226.953c41.753,0,75.724-33.974,75.724-75.736c0-41.753-33.97-75.724-75.724-75.724
                                                    c-41.753,0-75.722,33.969-75.722,75.724C180.276,192.977,214.246,226.953,255.998,226.953z M255.998,117.925
                                                    c18.357,0,33.293,14.934,33.293,33.291c0,18.364-14.936,33.305-33.293,33.305s-33.291-14.941-33.291-33.305
                                                    C222.707,132.86,237.642,117.925,255.998,117.925z"
                          />
                          <path
                            d="M473.053,194.757c0-11.717-9.499-21.215-21.216-21.215h-47.831C419.387,77.012,344.64,0,255.998,0
                                                    c-87.981,0-163.53,76.35-148.012,173.541H60.161c-11.717,0-21.216,9.499-21.216,21.215v296.028
                                                    c0,11.717,9.499,21.215,21.216,21.215h391.679h0.001h0.001c11.388,0,21.213-9.236,21.213-21.215
                                                    C473.053,477.597,473.053,207.852,473.053,194.757z M392.033,216.16c0.009-0.023,0.017-0.045,0.026-0.068
                                                    c0.014-0.04,0.031-0.081,0.045-0.12h38.517v105.341h-87.384C360.19,289.228,379.323,250.328,392.033,216.16z M255.998,42.431
                                                    c67.658,0,127.976,63.229,100.911,145.712c-19.504,59.443-68.939,147.93-100.911,201.766
                                                    c-31.877-53.684-81.409-142.34-100.911-201.766C127.96,105.455,188.5,42.431,255.998,42.431z M159.361,469.569H81.376V215.972
                                                    h38.519c6.24,17.162,18.992,47.189,39.466,87.262V469.569z M201.792,469.569v-88.371c20.309,35.423,36.022,60.593,36.219,60.905
                                                    c8.304,13.275,27.675,13.267,35.973,0c0.202-0.323,16.963-27.167,38.242-64.437l89.384,91.903H201.792z M430.624,438.541
                                                    l-72.749-74.797h72.749V438.541z"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="text-gray-100">Map</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
