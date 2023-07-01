<template>
  <div class="navbar fixed h-screen border border-gray-300 z-2 bg-white">
    <div class="navbar-img h-28 flex items-center pl-6">
      <img
        class="insta-icon__black"
        v-if="searchClicked"
        src="../../assets/img/insta-black-icon.png"
        alt=""
      />
      <img
        v-else
        class="w-1/2 h-8"
        src="../../assets/img/insta-text.jpg"
        alt=""
      />
    </div>
    <div class="navbar-link flex flex-col">
      <router-link
        class="nav-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/home' }"
        to="/main-page"
        @click="setActiveLink('/main-page')"
        ><i
          class="bi bi-house-door-fill my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Home</router-link
      >
      <router-link
        class="nav-router search-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/search' }"
        to="/search"
        @click="handleSearchClick($event)"
        ><i
          class="bi bi-search my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Search</router-link
      >
      <router-link
        class="nav-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/explore' }"
        to="/explore"
        @click="setActiveLink('/explore')"
        ><i
          class="bi bi-compass my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Explore</router-link
      >
      <router-link
        class="nav-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/reels' }"
        to="/reels"
        @click="setActiveLink('/reels')"
        ><i
          class="bi bi-play-btn my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Reels</router-link
      >
      <router-link
        class="nav-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/create' }"
        to="/home"
        @click="setActiveLink('/create')"
      >
        <i
          class="bi bi-plus-square my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Create
      </router-link>
      <router-link
        class="nav-router mx-auto my-2 rounded-md h-11 flex text-black-400 items-center"
        :class="{ selected: activeLink === '/profile' }"
        to="/profile"
        @click="setActiveLink('/profile')"
        ><i
          class="bi bi-person-circle text-gray-400 my-0 mx-4 font-bold text-[24px]"
          @click="handleIconClick"
        ></i
        >Profile</router-link
      >
    </div>
    <div v-if="showModal" class="modal">
      <!-- Modal overlay -->
      <span class="close" @click="hideModal">&times;</span>
      <div class="modal-overlay"></div>

      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <i
            class="bi bi-arrow-left cursor-pointer"
            v-if="uploadedPhoto"
            @click="handleBackClick"
          ></i>
          <h3 v-if="!uploadedPhoto">Create new post</h3>
          <h3 class="cursor-pointer" @click="handleBackClick()" v-if="uploadedPhoto">Crop</h3>
          <h4
            class="absolute cursor-pointer next-text"
            v-if="uploadedPhoto"
            @click="handleNextClick"
          >
            Next
          </h4>
          <h4 @click="hideModal" v-if ="nextClicked" class="absolute cursor-pointer share-text">
            Share
          </h4>
        </div>
        <div
          v-if="!uploadedPhoto"
          class="modal-body flex flex-col justify-center items-center"
        >
          <i class="bi bi-images"></i>
          <h3>Upload photos and videos here</h3>
          <input
            type="file"
            name=""
            id="select-post-input"
            @change="handleFileChange"
          />
          <label for="select-post-input"> Select from computer </label>
        </div>
        <div
          v-else
          class="modal-body flex flex-col justify-center items-center"
        >
          <img
            :src="uploadedPhoto"
            alt="Uploaded photo"
            class="uploaded-photo"
          />
          <div class="create-post--user-info flex justify-between">
            <img src="../../assets/img/none-profile-img.jpg" alt="" />
            <div v-if="nextClicked" class="post-finish">
              <div class="share-post-user-name flex items-center">
                <img src="../../assets/img/none-profile-img.jpg" alt="">
              <h4>ahrorbekuralbayev</h4>
              </div>
            <textarea placeholder="Write a caption"></textarea>
            <input type="text" class="ss" placeholder="Add location">
            <h4>Accessibility</h4>
            <p>
              Alt text describes your photos for people with visual impairments.
              Alt text will be automatically created for your photos or you can
              choose to write your own.
            </p>
            <div class="post-alt flex">
              <img
            :src="uploadedPhoto"
            alt="Uploaded photo"
          />
          <input type="text" placeholder="Write alt text...">
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="addition-navbar hidden fixed">
    <div class="addition-navbar--header">
      <h1>Search</h1>
      <input type="text" placeholder="Search" v-model="searchInput" @input="filterUsers" />
    </div>
    <div class="addition-navbar--found">
      <h3>Recent</h3>
      <div class="found-users">
        <div v-if="filteredUsers.length === 0" class="no-users-found">No users found</div>
        <div v-else class="found-user flex" v-for="user in filteredUsers" :key="user.id">
          <img src="../../assets/img/jioi.jpg" alt="">
          <div class="found-user-info">
            <h3>{{ user.name }}</h3>
            <p>{{ user.username }}</p>
          </div>
          <img class="official-icon" src="../../assets/img/official.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      activeLink: "/home",
      showModal: false,
      uploadedPhoto: null,
      searchClicked: false,
      nextClicked: false,
      users: [
        { id: 1, name: "Jack Wilson", username: "Jacke", avatar: "../../assets/img/huy.jpg" },
        { id: 2, name: "Kubesh Kumar", username: "Jacke", avatar: "../../assets/img/hindi.jpg" },
        { id: 3, name: "Piter Parter", username: "Parker", avatar: "../../assets/img/jake.jpg" },
        { id: 4, name: "Tima Temploton", username: "Tim", avatar: "../../assets/img/nuita.jpeg" },
        { id: 5, name: "Seu Long", username: "Siu", avatar: "../../assets/img/lop.jpg" },
        { id: 6, name: "Tamaret Polin", username: "Locki", avatar: "../../assets/img/kiop.jpg" },
        { id: 7, name: "Cuirees Bob", username: "Bob", avatar: "../../assets/img/jioi.jpg" },
        { id: 8, name: "Marupa", username: "Mosted", avatar: "../../assets/img/moinuy.jpg" }
      ],
      searchInput: "",
    };
  },
  computed: {
    filteredUsers() {
      if (this.searchInput === "") {
        return this.users;
      } else {
        const searchTerm = this.searchInput.toLowerCase();
        return this.users.filter(user => user.name.toLowerCase().includes(searchTerm));
      }
    }
  },
  methods: {
    setActiveLink(link) {
      if (link === "/create") {
        this.showModal = true;
        document.querySelector(".addition-navbar").style.display = "none"
        document.body.classList.add("modal-open");
      } else {
        this.activeLink = link;
        this.showModal = false;
        document.body.classList.remove("modal-open");
        this.$router.push(link);
      }
    },
    filterUsers() {
      this.searchClicked = true;
    },
    hideModal() {
      this.showModal = false;
      document.body.classList.remove("modal-open");
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedPhoto = reader.result; 
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    handleNextClick() {
      this.nextClicked = true;
      document.querySelector(".modal-content").style.width = "900px";
      document.querySelector(".next-text").style.display = "none"
      document.querySelector(".uploaded-photo").style.transform ="translateX(-200px)";
      document.querySelector(".uploaded-photo").style.borderBottomRightRadius = "0";
      document.querySelector(".modal-header").style.width = "104%";
      document.querySelector(".uploaded-photo").style.width = "500px";
      document.querySelector(".modal-header h3").innerText = "Edit";
      document.querySelector(".bi-arrow-left").style.display = "none";
    },
    handleSearchClick(event) {
      this.setActiveLink("/search");
      const routerLinks = document.querySelectorAll(".nav-router");
      this.searchClicked = true;
      document.querySelector(".navbar").style.width = "5%";
      document.querySelector(".addition-navbar").style.display = "block";
      document.querySelector(".addition-navbar").style.margin = "0 4.8rem";
      document.querySelector(".search-router").style.width = "75%";
      document.querySelector(".nav-router").style.width = "75   %";
      document.querySelector(".search-router").style.border = "1px solid gray";
      routerLinks.forEach((link) => {
        const icon = link.querySelector("i");
        const textNode = Array.from(link.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE
        );
        if (icon && textNode) {
          link.removeChild(textNode);
        }
      });
    },
    handleIconClick(event) {
      event.stopPropagation();
      this.searchClicked = false;
    },
    handleBackClick() {
      document.querySelector(".modal-content").style.width = "550px";
      this.uploadedPhoto = !this.uploadedPhoto;
      document.querySelector(".share-text").style.color = "none"
    },
  },
};
</script>

<style>
.found-users {
  width: 100%;
}
.found-users img {
  width: 45px;
  margin: 0 0.7rem;
  border-radius: 50%;
  height: 45px;
}
.found-user {
  display: flex;
  margin: 2rem 0;
}
.found-user-info h3{
  font-size: 13px !important;
}
.official-icon{
  width: 25px !important;
  height: 25px !important;
  margin: 0 !important;
}
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.addition-navbar {
  height: 100%;
  border-bottom-right-radius: 14px;
  border-top-right-radius: 14px;
  width: 25%;
  background-color: white;
  box-shadow: 10px -1px 8px -6px rgba(34, 60, 80, 0.2);
}

.addition-navbar--header {
  border-bottom: 1px solid rgb(188, 188, 188);
  padding: 1rem;
}
.addition-navbar--header h1 {
  font-size: 25px;
  font-weight: 500;
  margin: 1.5rem 0;
}
.post-finish {
  width: 44%;
  height: 510px;
}
.post-finish img {
  width: 40px;
  border: 1;
  margin: 0 0.7rem;
  height: 40px;
}
.post-alt input {
  border: 1px solid rgb(197, 197, 197);
  height: 5vh;
  font-size: 13px;
  width: 60% !important;
  font-size: 14px;
  border-radius: 6px;
}
.post-finish h4 {
  font-size: 15px;
  font-weight: 500;
  margin: 0.7rem 1rem;
}
.post-finish p {
  font-size: 13px;
  margin: 1rem;
  color: gray;
}
.share-post-user-name h4{
  font-size: 14px;
  font-weight: 500;
}
.post-finish input{
  display: flex !important;
  width: 100%;
  font-size: 15px;
  padding: 0.5rem 1rem;
  outline: none;
  align-items: center;  
  border-bottom: 1px solid rgb(179, 179, 179);
}
.post-alt input:focus {
  border: 1px solid gray;
}
.post-finish textarea {
  width: 100%;
  padding-left: 2rem;
  border-bottom: 1px solid rgb(204, 204, 204);
  font-size: 14px;
  outline: none;
  height: 220px;
}
.share-post-user-name img{
  width: 35px;
  height: 35px;
}
.share-post-user-name {
  margin: 1rem ;
}

.addition-navbar--header input {
  width: 100%;
  padding: 0.7rem;
  outline: none;
  margin: 0.5rem 0;
  font-weight: 400;
  border-radius: 6px;
  background-color: rgb(235, 235, 235) !important;
}

.addition-navbar--found {
  height: 80%;
  padding: 1rem;
}

.addition-navbar--found h3 {
  font-size: 17px;
  font-weight: 500;
}

.addition-navbar--found h4 {
  margin: 70% 33%;
  width: 200px;
  font-weight: 500;
  font-size: 15px;
  color: gray;
}

.modal-overlay {
  position: fixed;
  top: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  bottom: 0;
  left: 0;
  right: 0;
}

.modal-content {
  position: absolute;
  background-color: white;
  width: 500px;
  height: 550px;
  border-radius: 14px;
  opacity: 1;
  padding: 20px;
  z-index: 33;
}

.insta-icon__black {
  width: 30px;
  height: 30px;
  margin: 0 -0.5rem;
  cursor: pointer;
}

.uploaded-photo {
  position: absolute;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  width: 99.4%;
  height: 510px;
}

.modal-header {
  border-bottom: 1px solid rgb(163, 163, 163);
  height: 5vh;
  align-items: center;
  display: flex;
  text-align: center;
  font-weight: 600;
  margin-top: -1rem;
  margin-left: -1.1rem;
  width: 108%;
}

.modal-header h3 {
  margin: 0 auto;
}

.modal-header h4 {
  margin: 0 90%;
  color: rgb(28, 91, 251);
}
.modal-header h4:hover {
  color: blue;
}

.modal-header i {
  margin: 0 0.5rem;
  position: absolute;
  font-size: 30px;
}

.modal-body {
  height: 100%;
}

.modal-body h3 {
  font-size: 20px;
  margin: 0.4rem 0;
}

.modal-body i {
  font-size: 70px;
  margin: 0.7rem 0;
}

.modal-body input {
  display: none;
}

.modal-body label {
  background-color: rgb(0, 119, 255);
  padding: 0.6rem 0.7rem;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
  margin: 0.7rem 0;
}

.modal-body label:hover {
  background-color: rgb(35, 87, 199);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 37px;
  z-index: 2;
  opacity: 1;
  color: white;
  cursor: pointer;
}

.navbar {
  width: 17vw;
}

.navbar-link {
  height: 92%;
}

.nav-router {
  width: 90%;
}

.nav-router:hover {
  background-color: rgb(238, 238, 238);
}

.nav-router:hover i {
  font-size: 25px;
}

.selected {
  font-weight: bold;
}
</style>
