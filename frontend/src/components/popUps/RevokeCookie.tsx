"use client";

export default function RecommendLang() {
  return (
    <div>
      <p>Não achamos essa cookie</p>
      <button onClick={(event) => event.currentTarget.parentElement?.remove()}>
        Continuar
      </button>
    </div>
  );
}
