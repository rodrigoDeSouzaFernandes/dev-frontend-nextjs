// import useProductsList from "./useProductsList";
// import { productsService } from "@/lib/services/products.service";
// import { Product } from "@/types/products";

// jest.mock("@/lib/services/products.service");

// const mockGetAll = productsService.getAll as jest.Mock;

// describe("useProductsList", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should return product list when API succeeds", async () => {
//     const mockProducts: Product[] = [
//       {
//         id: 1,
//         title: "Keyboard",
//         description: "Mechanical keyboard",
//         price: 199.9,
//         category: "Peripherals",
//         image: "www.example.com/keyboard.jpg",
//       },
//       {
//         id: 2,
//         title: "Mouse",
//         description: "Gaming mouse",
//         price: 99.9,
//         category: "Peripherals",
//         image: "www.example.com/mouse.jpg",
//       },
//     ];

//     mockGetAll.mockResolvedValue(mockProducts);

//     const response = await useProductsList();

//     expect(productsService.getAll).toHaveBeenCalledTimes(1);
//     expect(response).toEqual({
//       products: mockProducts,
//       error: false,
      
//     });
//   });

//   it("should return empty list and error = true when API fails", async () => {
//     mockGetAll.mockRejectedValue(new Error("Request failed"));

//     const response = await useProductsList();

//     expect(productsService.getAll).toHaveBeenCalledTimes(1);
//     expect(response).toEqual({
//       products: [],
//       error: true,
//     });
//   });
// });
