export async function generateMetadata({ params }) {
  const id = params.id;
  const res = await fetch(`/api/services/${id}`);
  const service = await res.json();

  return {
    title: `${service.title} | CareGivers Service`,
    description: service.description?.slice(0, 160),
    openGraph: {
      images: [service.image],
    },
  };
}