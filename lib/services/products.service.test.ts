import { productsService } from "./products.service";
import { api } from "../api";
import { Product } from "@/types/products";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
  },
];

jest.mock("../api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("ProductsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call the correct URL", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });
      await productsService.getAll();
      expect(api.get).toHaveBeenCalledWith("/products");
    });

    it("should return the product list", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });
      const result = await productsService.getAll();
      expect(result).toEqual(mockProducts);
    });

    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(productsService.getAll()).rejects.toThrow(error);
    });
  });

  describe("getById", () => {
    it("should call the correct URL", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      await productsService.getById(1);
      expect(api.get).toHaveBeenCalledWith("/products/1");
    });

    it("should return a single product", async () => {
      (api.get as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      const result = await productsService.getById(1);
      expect(result).toEqual(mockProducts[0]);
    });

    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(productsService.getById(1)).rejects.toThrow(error);
    });
  });

  describe("create", () => {
    it("should call the correct URL", async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      await productsService.create(mockProducts[0]);
      expect(api.post).toHaveBeenCalledWith("/products", mockProducts[0]);
    });

    it("should return the created product", async () => {
      (api.post as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      const result = await productsService.create(mockProducts[0]);
      expect(result).toEqual(mockProducts[0]);
    });

    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.post as jest.Mock).mockRejectedValue(error);

      await expect(productsService.create(mockProducts[0])).rejects.toThrow(
        error
      );
    });
  });

  describe("update", () => {
    it("should call the correct URL", async () => {
      (api.put as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      await productsService.update({ id: 1, payload: mockProducts[0] });
      expect(api.put).toHaveBeenCalledWith("/products/1", mockProducts[0]);
    });

    it("should return the created product", async () => {
      (api.put as jest.Mock).mockResolvedValue({ data: mockProducts[0] });
      const result = await productsService.update({
        id: 1,
        payload: mockProducts[0],
      });
      expect(result).toEqual(mockProducts[0]);
    });

    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.put as jest.Mock).mockRejectedValue(error);

      await expect(
        productsService.update({ id: 1, payload: mockProducts[0] })
      ).rejects.toThrow(error);
    });
  });

  describe("delete", () => {
    it("should call the correct URL", async () => {
      (api.delete as jest.Mock).mockResolvedValue(undefined);
      await productsService.delete(1);
      expect(api.delete).toHaveBeenCalledWith("/products/1");
    });

    it("should successfully delete the product", async () => {
      (api.delete as jest.Mock).mockResolvedValue(undefined);
      const result = await productsService.delete(1);
      expect(result).toBeUndefined();
    });

    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.delete as jest.Mock).mockRejectedValue(error);

      await expect(productsService.delete(1)).rejects.toThrow(error);
    });
  });
});
