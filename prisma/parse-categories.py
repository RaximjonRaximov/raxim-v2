import json
import re

with open("prisma/categories-input.txt", "r") as f:
    text = f.read()

# Stop at the >>> separator if present
if ">>>>>>>" in text:
    text = text.split(">>>>>>>")[0]

categories = []
current = None

for line in text.splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith("##"):
        title_match = re.match(r"##\s*\d+\.\s*(.+)", line)
        if title_match:
            if current:
                categories.append(current)
            current = {"title": title_match.group(1).strip(), "subcategories": []}
    elif line.startswith("-"):
        sub = line[1:].strip()
        if current and sub:
            current["subcategories"].append(sub)

if current:
    categories.append(current)

with open("prisma/categories.json", "w") as f:
    json.dump(categories, f, indent=2)

print(f"Parsed {len(categories)} categories with {sum(len(c['subcategories']) for c in categories)} subcategories.")
