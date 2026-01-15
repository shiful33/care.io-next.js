export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(`https://care-io-next-js.vercel.app/api/services/${id}`);
  const service = await res.json();

  return {
    title: `${service.title} | CareGivers Service`,
    description: service.description?.slice(0, 160),
    openGraph: {
      images: [service.image],
    },
  };
}