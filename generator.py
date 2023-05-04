# -*- coding: utf-8 -*-
import qrcode, os
from PIL import Image, ImageFont, ImageDraw

# Read in the data file
data = open("./data.txt", "r", encoding="utf-8")
# Read in the template file
with open("./template.html", "r", encoding="utf-8") as template_file:
    template = template_file.read()
# font for QR
font = ImageFont.truetype("arial.ttf", 30)
index = 0
roman_numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII"]

for line in data:
    [id, place, item, map, text] = [x.strip() for x in line.split("|")]
    # QR
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=8,
    )
    qr.add_data("http://stopymt.xyz/" + id + "/")
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    img.save("./qr/" + id + ".png")
    img = Image.open("./qr/" + id + ".png")
    imgDraw = ImageDraw.Draw(img)
    _, _, w, h = imgDraw.textbbox((0, 0), id, font=font)
    imgDraw.text(((450 - w) / 2, 20), id, font=font)
    imgDraw.text(((450 - w) / 2, 430 - h), id, font=font)
    imgDraw.rectangle([0, 0, 449, 449], fill=None, width=8)
    img.save("./qr/" + id + ".png")
    # ---

    # HTML
    html = "" + template
    # create directory
    if not os.path.exists(id):
        os.mkdir(id)
    # Replace the placeholders with the variable values
    html = html.replace("{id}", id)
    html = html.replace("{place}", place)
    html = html.replace("{map}", map)
    html = html.replace("{text}", text)
    html = html.replace("{index}", roman_numerals[index])

    if id == "uoU3leDkv8uNsAg6":
        html = html.replace("</body>",'<audio controls id="song" loop><source src="/pisen.mp3" type="audio/mpeg"></audio></body>')

    # Create the directory if it doesn't exist
    if not os.path.exists(id):
        os.makedir(id)

    # Write the output file
    with open("./" + id + "/index.html", "w", encoding="utf-8") as output_file:
        output_file.write(html)
    # ---
    index = index + 1
