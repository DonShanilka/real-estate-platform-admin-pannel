import axios from "@/src/lib/axios";

export const getMyChat = async () => {
    const response = await axios.get("/chat/my");
    return response.data;
}

