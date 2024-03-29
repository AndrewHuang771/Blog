from flask import render_template, request, Blueprint
from app.models import Post

main = Blueprint('main', __name__)

@main.route("/")
def root():
    page = request.args.get('page', 1, type=int)
    search_string = request.args.get('search', '', type=str)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=12)
    if search_string != '':
        posts = Post.query.filter(Post.title.contains(search_string)).order_by(Post.date_posted.desc()).paginate(page=page, per_page=12)
    return render_template('home.html', posts=posts)
