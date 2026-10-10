import React from "react";

const unitLabels = {
  kg: "কেজি",
  gram: "গ্রাম",
  liter: "লিটার",
  piece: "পিস",
};

const formatBanglaNumber = (value) =>
  value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });

export default function RisersCard({ riserDataInfo }) {
  const isUp = riserDataInfo.change.dir === "up";
  const isDown = riserDataInfo.change.dir === "down";

  const changeStyle = isUp
    ? "bg-[#F0F5F1] text-red-600"
    : isDown
      ? "bg-[#EAF7EE] text-green-700"
      : "bg-gray-100 text-gray-600";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "•";

  const unitLabel = unitLabels[riserDataInfo.unit] ?? riserDataInfo.unit;

  return (
    <article className="w-full rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
      {/* Product information */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F0F5F1] text-2xl">
          {riserDataInfo.image || riserDataInfo.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-6 text-[#243128]">
            {riserDataInfo.nameBn}
          </h3>

          <p className="text-sm text-[#657168]">
            প্রতি {unitLabel}
          </p>
        </div>
      </div>

      {/* Price and price change */}
      <div className="mt-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-[#657168]">
            আজকের দাম
          </p>

          <p className="text-xl font-bold leading-7 text-[#243128]">
            ৳{formatBanglaNumber(riserDataInfo.today)}
            <span className="ml-1 text-sm font-normal">
              টাকা
            </span>
          </p>
        </div>

        <span
          className={`mb-1 inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${changeStyle}`}
        >
          <span className="text-[10px]">{changeIcon}</span>
          {formatBanglaNumber(Math.abs(riserDataInfo.change.pct))}%
        </span>
      </div>
    </article>
  );
}