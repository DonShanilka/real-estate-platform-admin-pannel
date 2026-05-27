import axios from "@/src/lib/axios";
import { Review } from "@/src/types/review";

export const reviewApi = {
  /**
   * Fetches all reviews across the platform.
   */
  async getAllReviews(): Promise<Review[]> {
    const response = await axios.get("/reviews");
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  },

  /**
   * Deletes a review from the database.
   */
  async deleteReview(id: number): Promise<number> {
    await axios.delete(`/reviews/${id}`);
    return id;
  }
};
