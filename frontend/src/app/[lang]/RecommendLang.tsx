"use client";

type Props = {
  lang: string;
};

export default function RecommendLang({ lang }: Props) {
  return (
    <div>
      <p>Queres mudar para {lang}?</p>
      <button>Mudar de língua</button>
      <button onClick={(event) => event.currentTarget.parentElement?.remove()}>
        Continuar
      </button>
    </div>
  );
}
