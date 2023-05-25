from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text


def seed_posts():
  #first set
  hi = Post(content="Hello World", user_id=5, image="https://linkyet-april-2023.s3.us-west-2.amazonaws.com/c98ab850ad514f3ea87bb17b284f8d0e.png")
  find_easter_egg = Post(user_id = 5, content="Are you looking for an Easter Egg?")
  get_advice = Post(content="Any advice for programming?", user_id=3)
  joke = Post(user_id=3, content="Post your programming joke here")

  first_post = [hi, find_easter_egg, get_advice, joke]

  # set for user 2
  good_sites = Post(user_id = 2,content="What are some good sites for learn new language")
  study_circle = Post(user_id = 2,content="Anyone wants to have a study circle?")

  second_user = [good_sites, study_circle]

  #wise words
  code_last = Post(user_id = 1, content="Typing codes should be the last thing you do")

  wise_words = [code_last]

  reading_club = Post(user_id=7, content="I am happy to announce that I have created the reading club in ABC Library \
                      from 3pm to 5pm every Monday and Wednesday. If you like reading, feel free to join us to read or \
                      share your story learned from the book.",
                      image ="https://linkyet-april-2023.s3.us-west-2.amazonaws.com/97067543bb5e4ff3a892bef3cefa5a66.png")
  xi_thankyou = Post(user_id=10, content="I offically announced that I have completed all 3 projects. Thank you for those who give me advice and feedback to improve my projects. Without suggestions from you, I couldn't catch every single bug. Once again, thank you all for helping me to make high qulaity projects. Love you all!",
                     image="https://media.licdn.com/dms/image/D5612AQEA3uvBa4Tfcg/article-cover_image-shrink_720_1280/0/1665182128980?e=2147483647&v=beta&t=GNFrug0rLyU7hiZRPzIL0p5mJ1c6caSeHwp0NIVjS0E")
  checkout_easter = Post(user_id=5, content="Check out my code I did for my little project. I like this feature a lot.", image="https://linkyet-april-2023.s3.us-west-2.amazonaws.com/0b2f2b254f9d4d418f2744ba24d8ab63.png")
  plan_your_work = Post(user_id=11, content="Planning is important", image="https://quotefancy.com/media/wallpaper/1600x900/106903-Napoleon-Hill-Quote-Plan-your-work-and-work-your-plan.jpg")
  goal_never_change = Post(user_id=3, content="pretty inspired", image="https://media.images.yourquote.in/post/large/0/0/14/356/xyn78262.jpg")
  chat_GPT = Post(user_id=2, content="With the new born tech chatGPT, we are able to have easier way to get questions answered.")

  lorem1 = Post(user_id=8, content="[Lorem Ipsum] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultrices enim quis mauris sagittis gravida. Aliquam mattis metus eu nunc convallis, non dignissim enim sagittis. Nunc magna mi, tempor at velit eu, fringilla mollis elit.")
  lorem2 = Post(user_id=7, content="[Lorem Ipsum] Nullam eros massa, iaculis eu nunc nec, facilisis aliquam leo. Praesent posuere purus feugiat scelerisque dictum. Pellentesque sit amet tellus interdum, mattis est et, vulputate orci.")
  lorem3 = Post(user_id=3, content="[Lorem Ipsum] Etiam eros magna, blandit non tincidunt ac, consectetur a dolor. Sed dignissim imperdiet dictum. Vivamus faucibus sed massa et pulvinar. Mauris bibendum laoreet est, eu fermentum sapien accumsan quis. Maecenas sit amet sagittis dui, ac ullamcorper lectus.")
  lorem4 = Post(user_id=3, content="[Lorem Ipsum] Vestibulum congue a nisl ac pharetra. Etiam laoreet congue magna vitae mollis. Vestibulum pellentesque turpis et sapien mollis posuere. Phasellus malesuada, eros vitae facilisis gravida, risus nisl dictum nulla, hendrerit congue lacus nisi vitae nunc. Maecenas tincidunt gravida turpis, et rhoncus est luctus eget.")
  lorem5 = Post(user_id=8, content="[Lorem Ipsum] Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ut dictum metus. Nunc pharetra mattis ante, id consectetur tellus rhoncus in. Fusce ornare, mauris in aliquam luctus, justo justo tempus urna, vel auctor leo tortor non felis. Praesent at feugiat justo.")
  lorem6 = Post(user_id=6, content="[Lorem Ipsum] Aenean vitae bibendum augue. Fusce vel congue nisl. Fusce vitae bibendum est, sit amet pellentesque tortor. Sed finibus dui id velit dictum, sed tempor augue vestibulum. Integer consectetur at metus et feugiat.")
  lorem7 = Post(user_id=4, content="[Lorem Ipsum] Donec vulputate sed urna ac consequat. Suspendisse et elementum risus. Pellentesque nec tincidunt ligula, eu scelerisque nibh. Nunc posuere nunc lectus, in accumsan elit mattis ut. ")

  more_posts = [reading_club, lorem1, xi_thankyou, lorem2, checkout_easter, lorem3, plan_your_work, lorem5, chat_GPT, lorem4, goal_never_change, lorem6, lorem7]
  # add all data
  [db.session.add(post) for post in first_post]
  [db.session.add(post) for post in second_user]
  [db.session.add(post) for post in wise_words]
  [db.session.add(post) for post in more_posts]
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
