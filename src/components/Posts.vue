<template>
  <div>
    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post-item">
        <img v-if="post.media_type === 'IMAGE'" :src="post.media_url" />
        <video
          v-else-if="post.media_type === 'VIDEO'"
          :src="post.media_url"
          controls
        ></video>
        <!-- <p>{{ post.caption }}</p> -->
      </div>
    </div>
    <!-- <p>{{ errorMessage }}</p> -->
    <div class="upload-post-section" v-if="posts.length === 0">
        <input type="file" id="upload-input">
        <label for="upload-input">
            <h1 class="upload-label"><i class="bi bi-camera"></i></h1>
        </label>
        <h2>Share Photos</h2>
        <p>When you share photos, they will appear on your profile. </p>
        <label for="upload-input">
            <h3>Share you first photo</h3>
        </label>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const accessToken =
  "IGQVJVcG1NMW1GcElBZAS0wTnF5OUxYWnFMMEhfZAnF2SVNoWTR4UV93TGZARcWwzTk1YUjZAoTXpGMW40MjEtVVdpNUI5NjJXY0cwT2c3RmxBWFNWaXhueHE2MVBwZAC04a0FfTW5kRDVfUjhkb2VBamo2aAZDZD";
const apiUrl =
  "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=";

export default {
  data() {
    return {
      posts: [],
      errorMessage: "",
    };
  },
  async mounted() {
    try {
      const response = await axios.get(apiUrl + accessToken);
      console.log(response.data);
      this.posts = response.data.data.filter(
        (item) => item.media_type === "VIDEO" || item.media_type === "IMAGE"
      );
      console.log(this.posts);
      if (this.posts.length === 0) {
        this.errorMessage = "No posts found for your account.";
      }
    } catch (error) {
      console.log(error.response);
      this.errorMessage =
        "Failed to fetch Instagram posts. Please try again later.";
    }
  },
};
</script>
<style>
.post-list{
    width: 65vw;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    margin: auto;
}
.post-item {
    width: 30%;
    margin: 0.1rem;
    height: 40vh;
}
.upload-label {
    font-size: 35px;
    width: 70px;
    height: 70px;
    color: rgb(14, 14, 79);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    border: 3px solid rgb(14, 14, 79);
}
.post-item img,video {
    width: 100%;
    height: 100%;
}
.upload-post-section {
    width: 92%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#upload-input{
    display: none;
}
.upload-post-section h2 {
    font-size: 30px;
    font-weight: 1000;
}
.upload-post-section p {
    font-size: 14px;
    margin: 1rem 0;
}
.upload-post-section h3 {
    font-size: 14px;
    font-weight: 600    ;
    color: rgb(109, 109, 255);
    cursor: pointer;
}
.upload-post-section h3:hover{
    color: rgb(14, 14, 79);
}
</style>