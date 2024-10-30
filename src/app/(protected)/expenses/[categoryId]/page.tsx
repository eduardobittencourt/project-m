import { getCategory } from "@/data/categories";
import { action } from "./action";

type EditCategoryPageParams = { params: Promise<{ categoryId: string }> };

export default async function EditCategoryPage({
  params,
}: Readonly<EditCategoryPageParams>) {
  const { categoryId } = await params;
  const category = await getCategory(Number(categoryId));

  return (
    <form
      className="flex flex-1 flex-col items-center justify-center gap-2"
      action={action}
    >
      <input type="hidden" name="id" defaultValue={categoryId} />
      <input
        type="text"
        name="name"
        placeholder="Nome"
        defaultValue={category?.name}
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        defaultValue={category?.description ?? ""}
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
