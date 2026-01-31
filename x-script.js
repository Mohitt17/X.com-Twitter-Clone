// X (Twitter) Clone JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Like button animation
    const likeButtons = document.querySelectorAll('.action-btn.like');
    likeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('liked');
            
            const svg = this.querySelector('svg path');
            const count = this.querySelector('span');
            
            if (this.classList.contains('liked')) {
                svg.setAttribute('fill', '#f91880');
                if (count) {
                    const currentCount = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    count.textContent = formatNumber(currentCount + 1);
                }
                
                // Heart animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            } else {
                svg.setAttribute('fill', 'currentColor');
                if (count) {
                    const currentCount = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    count.textContent = formatNumber(currentCount - 1);
                }
            }
        });
    });

    // Retweet button animation
    const retweetButtons = document.querySelectorAll('.action-btn.retweet');
    retweetButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('retweeted');
            
            const svg = this.querySelector('svg path');
            const count = this.querySelector('span');
            
            if (this.classList.contains('retweeted')) {
                svg.setAttribute('fill', '#00ba7c');
                if (count) {
                    const currentCount = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    count.textContent = formatNumber(currentCount + 1);
                }
            } else {
                svg.setAttribute('fill', 'currentColor');
                if (count) {
                    const currentCount = parseInt(count.textContent.replace(/[^0-9]/g, ''));
                    count.textContent = formatNumber(currentCount - 1);
                }
            }
        });
    });

    // Follow button toggle
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.backgroundColor = 'transparent';
                this.style.color = 'var(--text-primary)';
                this.style.border = '1px solid var(--border-color)';
                
                // Show unfollow on hover
                this.addEventListener('mouseenter', function() {
                    this.textContent = 'Unfollow';
                    this.style.backgroundColor = 'rgba(244, 33, 46, 0.1)';
                    this.style.borderColor = 'rgba(244, 33, 46, 0.4)';
                    this.style.color = '#f4212e';
                });
                
                this.addEventListener('mouseleave', function() {
                    this.textContent = 'Following';
                    this.style.backgroundColor = 'transparent';
                    this.style.borderColor = 'var(--border-color)';
                    this.style.color = 'var(--text-primary)';
                });
            } else {
                this.textContent = 'Follow';
                this.style.backgroundColor = 'var(--text-primary)';
                this.style.color = 'var(--bg-primary)';
                this.style.border = 'none';
                this.onmouseenter = null;
                this.onmouseleave = null;
            }
        });
    });

    // Compose tweet character counter and auto-resize
    const composeTextarea = document.querySelector('.compose-content textarea');
    if (composeTextarea) {
        composeTextarea.addEventListener('input', function() {
            // Auto-resize
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            
            // Enable/disable post button
            const postBtn = document.querySelector('.post-submit-btn');
            if (this.value.trim().length > 0) {
                postBtn.disabled = false;
                postBtn.style.opacity = '1';
            } else {
                postBtn.disabled = true;
                postBtn.style.opacity = '0.5';
            }
        });
    }

    // Post button functionality
    const postSubmitBtn = document.querySelector('.post-submit-btn');
    if (postSubmitBtn) {
        postSubmitBtn.disabled = true;
        postSubmitBtn.style.opacity = '0.5';
        
        postSubmitBtn.addEventListener('click', function() {
            const textarea = document.querySelector('.compose-content textarea');
            const tweetText = textarea.value.trim();
            
            if (tweetText) {
                createNewPost(tweetText);
                textarea.value = '';
                textarea.style.height = 'auto';
                this.disabled = true;
                this.style.opacity = '0.5';
            }
        });
    }

    // Create new post
    function createNewPost(text) {
        const feedPosts = document.querySelector('.feed-posts');
        const newPost = document.createElement('article');
        newPost.className = 'post';
        newPost.style.animation = 'fadeIn 0.5s ease';
        
        newPost.innerHTML = `
            <div class="avatar">
                <div class="avatar-placeholder">U</div>
            </div>
            <div class="post-content">
                <div class="post-header">
                    <div class="post-author">
                        <span class="author-name">User Name</span>
                        <span class="author-handle">@username</span>
                        <span class="post-time">· now</span>
                    </div>
                    <button class="more-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <circle cx="5" cy="12" r="2"/>
                            <circle cx="12" cy="12" r="2"/>
                            <circle cx="19" cy="12" r="2"/>
                        </svg>
                    </button>
                </div>
                <div class="post-text">${escapeHtml(text)}</div>
                <div class="post-actions">
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
                        </svg>
                        <span>0</span>
                    </button>
                    <button class="action-btn retweet">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
                        </svg>
                        <span>0</span>
                    </button>
                    <button class="action-btn like">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
                        </svg>
                        <span>0</span>
                    </button>
                    <button class="action-btn">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path fill="currentColor" d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        feedPosts.insertBefore(newPost, feedPosts.firstChild);
        
        // Reinitialize event listeners for new post
        initializePostActions(newPost);
    }

    // Initialize post action buttons
    function initializePostActions(post) {
        const likeBtn = post.querySelector('.action-btn.like');
        const retweetBtn = post.querySelector('.action-btn.retweet');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('liked');
                const svg = this.querySelector('svg path');
                const count = this.querySelector('span');
                
                if (this.classList.contains('liked')) {
                    svg.setAttribute('fill', '#f91880');
                    count.textContent = '1';
                } else {
                    svg.setAttribute('fill', 'currentColor');
                    count.textContent = '0';
                }
            });
        }
        
        if (retweetBtn) {
            retweetBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('retweeted');
                const svg = this.querySelector('svg path');
                const count = this.querySelector('span');
                
                if (this.classList.contains('retweeted')) {
                    svg.setAttribute('fill', '#00ba7c');
                    count.textContent = '1';
                } else {
                    svg.setAttribute('fill', 'currentColor');
                    count.textContent = '0';
                }
            });
        }
    }

    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            console.log('Searching for:', this.value);
            // Add search functionality here
        });
    }

    // Infinite scroll simulation
    let isLoading = false;
    window.addEventListener('scroll', function() {
        if (isLoading) return;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 1000) {
            isLoading = true;
            setTimeout(() => {
                console.log('Loading more posts...');
                isLoading = false;
            }, 1000);
        }
    });

    // Utility functions
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Post click navigation (simulation)
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        post.addEventListener('click', function(e) {
            if (!e.target.closest('.action-btn') && !e.target.closest('.more-btn')) {
                console.log('Navigating to post details...');
            }
        });
    });

    // More button functionality
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Opening post options...');
            // Add dropdown menu here
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // N key - New tweet
        if (e.key === 'n' && !e.target.matches('input, textarea')) {
            const textarea = document.querySelector('.compose-content textarea');
            if (textarea) {
                textarea.focus();
            }
        }
        
        // Escape key - Clear compose
        if (e.key === 'Escape') {
            const textarea = document.querySelector('.compose-content textarea');
            if (textarea && document.activeElement === textarea) {
                textarea.blur();
            }
        }
    });

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        const rippleElement = button.querySelector('.ripple');
        if (rippleElement) {
            rippleElement.remove();
        }

        button.appendChild(ripple);
    }

    // Add ripple to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Console easter egg
    console.log('%cX', 'color: #1d9bf0; font-size: 60px; font-weight: bold;');
    console.log('%cWhat\'s happening?', 'color: #e7e9ea; font-size: 20px;');
    console.log('%cBuilt with ❤️', 'color: #f91880; font-size: 14px;');

});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .action-btn {
        transition: all 0.2s ease;
    }
    
    .action-btn.liked svg path {
        fill: #f91880 !important;
    }
    
    .action-btn.retweeted svg path {
        fill: #00ba7c !important;
    }
`;
document.head.appendChild(style);
