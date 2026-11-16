import Image from "next/image";

/**
 * The peanut chef. On Cascarelli's printed menu he stands beside every dish
 * that contains nuts, and the foot of the menu says so; this is the same
 * mark doing the same job. He is small on purpose and he is never the only
 * signal: the words "Contains nuts" travel with him for a screen reader and
 * on hover, and the legend at the top of the menu page spells it out.
 */
export default function NutMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`} title="Contains nuts">
      <Image
        src="/brand/chef.png"
        alt=""
        width={647}
        height={900}
        sizes="24px"
        className="h-7 w-auto"
      />
      <span className="sr-only">Contains nuts</span>
    </span>
  );
}
