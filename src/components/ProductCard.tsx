type Props = {
  title: string;
  image: string;
  price: string;
};

export default function ProductCard({ title, image, price }: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <img src={image} alt={title} className="rounded-md mb-4 w-full object-cover h-48" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">${price}</p>
    </div>
  );
}
