import { create } from "zustand";

const mainStore = create((set) => ({

    user: null,
    setUser: (val) => set({ user: val }),

    messages: [],
    setMessages: (newMessages) => set({ messages: newMessages || [] }),

    userPosts: [],
    setUserPosts: (newPost) => set({ userPosts: newPost || [] }),

    allPosts: [],
    setAllPosts: (newPost) => set({ allPosts: newPost || [] }),

    comments: [],
    setComments: (newComment) => set({ comments: newComment || [] }),

    token: "",
    setToken: val => set({ token: val }),

    savedPosts: [],
    setSavedPosts: (newPosts) => set((state) => {
        const updatedUser = { ...state.user, savedPosts: newPosts };
        return { user: updatedUser, savedPosts: newPosts };
    }),

    updatePostLikes: (postId, newLikes) =>
        set((state) => {
            const updatedPosts = state.allPosts.map((post) =>
                post._id === postId ? { ...post, postLikes: newLikes } : post
            );
            return { allPosts: updatedPosts };
        }),
}));

export default mainStore;
