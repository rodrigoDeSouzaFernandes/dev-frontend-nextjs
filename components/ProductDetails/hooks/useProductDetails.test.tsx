// import { productsService } from "@/lib/services/products.service";
// import { Product } from "@/types/products";
// import { useProductDetails } from "./useProductDetails";

// jest.mock("@/lib/services/products.service");

// const mockedGetById = productsService.getById as jest.Mock;

// describe("useProductDetails", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return product list when API succeeds", async () => {
//     const mockProduct: Product = {
//       id: 1,
//       title: "Test Product",
//       description: "Testing...",
//       price: 10,
//       category: "category1",
//       image: "www.example.com/image.png",
//     };

//     mockedGetById.mockResolvedValue(mockProduct);

//     const response = await useProductDetails({ productId: 1 });

//     expect(productsService.getById).toHaveBeenCalledWith(1);

//     expect(response).toEqual({
//       product: mockProduct,
//       error: false,
//     });
//   });

//   it("should return product = null and error = true when API fails", async () => {
//     mockedGetById.mockRejectedValue(new Error("Erro"));

//     const response = await useProductDetails({ productId: 1 });

//     expect(productsService.getById).toHaveBeenCalledWith(1);

//     expect(response).toEqual({
//       product: null,
//       error: true,
//     });
//   });
// });
