from pathlib import Path
import re

html = Path(r"d:\Headless WP\saas.html").read_text(encoding="utf-8")

for label, pattern in [
    ("blog_parent", r'data-id="9cb2d2c"'),
    ("wrong_blog", r'data-id="a9f5c08"'),
    ("faq", r'Frequently Asked'),
    ("compare", r'Compare to alternatives'),
]:
    print(label, html.find(pattern) if isinstance(pattern, str) and not pattern.startswith("Frequently") else ("ok" if pattern in html or re.search(pattern, html) else "missing"))

# Print structure IDs around blog->faq
idx = html.find('data-id="9cb2d2c"')
print("blog idx", idx)
# find next e-parent after blog section ends
chunk = html[idx:idx+15000]
ids = re.findall(r'data-id="([^"]+)"', chunk)
print("ids near blog", ids[:30])
faq_idx = html.find("Frequently Asked")
print("faq context:", html[faq_idx-400:faq_idx+80].replace("\n"," ")[:300])
