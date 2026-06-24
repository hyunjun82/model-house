// PNG 경로를 주면 AVIF(최신) + PNG(폴백)를 자동으로 출력하는 이미지 컴포넌트.
export default function Img({ src, alt = "", className }: { src: string; alt?: string; className?: string }) {
  const avif = src.replace(/\.png$/i, ".avif");
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <img src={src} alt={alt} className={className} loading="lazy" />
    </picture>
  );
}
