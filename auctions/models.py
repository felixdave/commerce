from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
from datetime import timedelta
from django.utils import timezone


class User(AbstractUser):
    watchlist = models.ManyToManyField("Listing", related_name="watchers")


class Category(models.Model):

    class Meta:
        verbose_name_plural = "categories"

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Listing(models.Model):
    active = models.BooleanField(default=True)
    category = models.ForeignKey(
        "Category", on_delete=models.SET_NULL, blank=True, null=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)
    seller = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="listings")
    starting_bid = models.DecimalField(max_digits=19, decimal_places=2)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

    def top_bid(self):
        try:
            return max(self.bids.all(), key=lambda b: b.amount)
        except ValueError:
            return None

    def price(self):
        bid = self.top_bid()
        return bid.amount if bid is not None else self.starting_bid

    def winner(self):
        bid = self.top_bid()
        return bid.bidder if bid is not None else None
    # Today, Yesterday, 2 - 5 days ago

    def created_in_days(self):
        now = timezone.now()
        post = self.creation_time
        yesterday = now - timedelta(days=1)
        two = now - timedelta(days=2)
        three = now - timedelta(days=3)
        four = now - timedelta(days=4)
        five = now - timedelta(days=5)
        if (now.year == post.year) and (now.month == post.month) and (now.day == post.day):
            return "Today"
        elif(now.year == post.year) and (now.month == post.month) and (yesterday.day == post.day):
            return "Yesterday"
        elif(now.year == post.year) and (now.month == post.month) and (two.day == post.day):
            return "2 days ago"
        elif(now.year == post.year) and (now.month == post.month) and (three.day == post.day):
            return "3 days ago"
        elif(now.year == post.year) and (now.month == post.month) and (four.day == post.day):
            return "4 days ago"
        elif(now.year == post.year) and (now.month == post.month) and (five.day == post.day):
            return "5 days ago"
        else:
            return None


class Bid(models.Model):
    amount = models.DecimalField(max_digits=19, decimal_places=2)
    bidder = models.ForeignKey("User", on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)
    listing = models.ForeignKey(
        "Listing", on_delete=models.CASCADE, related_name="bids")

    def __str__(self):
        return f"{self.listing} - {self.amount}"


class Comment(models.Model):
    content = models.TextField(blank=True)
    commenter = models.ForeignKey("User", on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)
    listing = models.ForeignKey(
        "Listing", on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return self.content
