import type { Article } from "@/lib/grub-gadget/content";
import { GrubGadgetSidebar } from "./Sidebar";

export function GrubGadgetSingleBlog({ article }: { article: Article }) {
  return (
    <div className="gg-main">
      <div className="gg-container">
        <div className="gg-content-grid">
          <article className="gg-single-article">
            <header className="gg-single-header">
              <h1 className="gg-single-title">{article.title}</h1>
            </header>

            <div className="gg-single-image">
              <img src={article.image} alt={article.title} />
            </div>

            <div className="gg-single-content">
              <p>{article.excerpt}</p>
              
              <h2>Introduction</h2>
              <p>
                This comprehensive guide will walk you through everything you need to know about this topic. 
                Whether you're a beginner or an experienced cook, you'll find valuable insights and practical 
                tips to help you achieve the best results.
              </p>

              <h2>Step-by-Step Instructions</h2>
              <p>
                Follow these detailed instructions to get perfect results every time. Make sure to read through 
                all the steps before you begin, and gather all your materials and ingredients.
              </p>

              <h3>Step 1: Preparation</h3>
              <p>
                Begin by preparing your toaster oven and gathering all necessary ingredients. Preheat the oven 
                to the recommended temperature and ensure all surfaces are clean.
              </p>

              <h3>Step 2: Cooking Process</h3>
              <p>
                Place your food in the toaster oven according to the instructions. Monitor the cooking process 
                carefully to ensure even heating and prevent burning.
              </p>

              <h3>Step 3: Finishing Touches</h3>
              <p>
                Once cooking is complete, carefully remove the food from the toaster oven using appropriate 
                tools. Allow it to cool slightly before serving.
              </p>

              <h2>Tips and Tricks</h2>
              <p>
                Here are some expert tips to help you get even better results: Always preheat your toaster oven 
                for optimal cooking, use the right temperature settings, and don't overcrowd the cooking surface.
              </p>

              <h2>Common Mistakes to Avoid</h2>
              <p>
                Avoid these common pitfalls when using your toaster oven: Don't skip preheating, avoid using 
                materials not rated for high heat, and always monitor your food to prevent overcooking.
              </p>

              <h2>Conclusion</h2>
              <p>
                With these tips and techniques, you'll be able to achieve perfect results every time. Remember 
                to practice and adjust based on your specific toaster oven model and preferences.
              </p>
            </div>
          </article>

          <GrubGadgetSidebar />
        </div>
      </div>
    </div>
  );
}
