// Função para carregar os posts
async function loadPosts() {
  try {
    // Comentar a chamada real da API
    const response = await fetch("http://localhost:8080/posts");
    const posts = await response.json();

    // Usar dados de teste
    //const posts = testData;
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ""; // Limpa o container

    posts.forEach((post) => {
      postsContainer.innerHTML += createPostHTML(post);
    });
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
  }
}

// Função para criar HTML do post
function createPostHTML(post) {
  return `
        <div class="post" data-post-id="${post.id}">
            <div class="post-header">
                <div class="post-info">
                    <h3 class="author">${post.author.name}</h3>
                    <span class="post-date">${formatDate(post.createdAt)}</span>
                </div>
            </div>
            
            <div class="post-content">
                <h4>${post.title}</h4>
                <p>${post.content}</p>
            </div>
            
            <div class="comments-section">
                <h5>Comentários (${post.comments.length})</h5>
                ${createCommentsHTML(post.comments)}
            </div>
            
            <div class="add-comment">
                <textarea placeholder="Adicione um comentário..."></textarea>
                <button onclick="addComment('${
                  post.id
                }', null)">Comentar</button>
            </div>
        </div>
    `;
}

// Função para criar HTML dos comentários
function createCommentsHTML(comments) {
  // Filtra comentários principais (sem parentCommentId)
  const mainComments = comments.filter((comment) => !comment.parentCommentId);

  return mainComments
    .map(
      (comment) => `
        <div class="comment" data-comment-id="${comment.id}">
            <div class="comment-header">
                <div class="comment-info">
                    <h6 class="comment-author">${comment.author.name}</h6>
                    <span class="comment-date">${formatDate(
                      comment.createdAt
                    )}</span>
                </div>
            </div>
            <div class="comment-content">
                <p>${comment.content}</p>
            </div>
            <div class="add-comment">
                <textarea placeholder="Adicione um comentário..."></textarea>
                <button onclick="addComment('${comment.postId}', '${
        comment.id
      }')">Comentar</button>
            </div>
            <div class="comment-replies">
                ${createRepliesHTML(comment.replies || [])}
            </div>
        </div>
    `
    )
    .join("");
}

// Função para criar HTML das respostas
function createRepliesHTML(replies) {
  return replies
    .map(
      (reply) => `
        <div class="comment reply" data-comment-id="${reply.id}">
            <div class="comment-header">
                <div class="comment-info">
                    <h6 class="comment-author">${reply.author.name}</h6>
                    <span class="comment-date">${formatDate(
                      reply.createdAt
                    )}</span>
                </div>
            </div>
            <div class="comment-content">
                <p>${reply.content}</p>
            </div>
            <div class="add-comment">
                <textarea placeholder="Adicione um comentário..."></textarea>
                <button onclick="addComment('${reply.postId}', '${
        reply.id
      }')">Comentar</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Funções de interação
async function addComment(postId, parentId = null) {
  const container = parentId
    ? document.querySelector(`[data-comment-id="${parentId}"] .reply-form`)
    : document.querySelector(`[data-post-id="${postId}"] .add-comment`);

  const content = container.querySelector("textarea").value.trim();
  if (!content) return;

  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        postId,
        parentCommentId: parentId,
      }),
    });

    if (response.ok) {
      loadPosts(); // Recarrega todos os posts
      container.querySelector("textarea").value = "";
    }
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
  }
}

// Funções auxiliares
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", loadPosts);

