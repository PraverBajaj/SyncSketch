import { getAPIUrlSimple } from "../../lib/api-simple";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${getAPIUrlSimple()}/chats/${roomId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  const messages = res.data.messages;
  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });

  try {
    const movementsRes = await axios.get(
      `${getAPIUrlSimple()}/shapeMovements/${roomId}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const movements = movementsRes.data.movements;

    if (movements && movements.length > 0) {
      movements.forEach((movement: any) => {
        const shapeIndex = movement.shapeIndex;
        if (shapes[shapeIndex]) {
          shapes[shapeIndex] = JSON.parse(movement.shapeData);
        }
      });
    }
  } catch (error) {
    console.error("Error fetching shape movements:", error);
  }

  return shapes;
}
