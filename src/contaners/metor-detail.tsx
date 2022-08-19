import { Container } from "@mui/system";
import { useState } from "react";
import MentorDetailProps from "../interface/mentor-detail/mentor-detail.interface";

function MentorDetail() {

  const [mentor, setMentor] = useState<MentorDetailProps>();
  const mockMentor : MentorDetailProps = {
    id: "1",
    intraId: "m-seoypar",
    name: "박서연",
    email: "good",
    company: "goood",
    duty: "gooood",
    profileImage: "https://via.placeholder.com/150",
    availability: "available",
    introduciotion: "introduction",
    tags: ["tag1", "tag2", "tag3"],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  setMentor(mockMentor);
    
  return (
    <div>
      <Container>
        <h1>Mentor Detail</h1>
      </Container>
    </div>
  );
}

export default MentorDetail;