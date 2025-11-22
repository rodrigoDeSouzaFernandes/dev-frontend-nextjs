import { usersService } from "./users.service";
import { api } from "../api";
import { Login } from "@/types/login";

const mockLogin: Login = {
  username: "test01",
  password: "test_01",
};

const mockSuccessResponse = { data: { token: "mock-token" } };

jest.mock("../api", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("usersService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should call the correct URL", async () => {
      (api.post as jest.Mock).mockResolvedValue(mockSuccessResponse);
      await usersService.login(mockLogin);
      expect(api.post).toHaveBeenCalledWith("/auth/login", mockLogin);
    });
    it("should return the token", async () => {
      (api.post as jest.Mock).mockResolvedValue(mockSuccessResponse);
      const result = await usersService.login(mockLogin);
      expect(result).toEqual(mockSuccessResponse.data);
    });
    it("should handle errors correctly", async () => {
      const error = new Error("Network Error");
      (api.post as jest.Mock).mockRejectedValue(error);
      await expect(usersService.login(mockLogin)).rejects.toThrow(error);
    });
  });
});
