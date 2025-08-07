import type { App } from 'leafer-ui';
import { LRUCache } from 'lru-cache';

class HistoryTools {
  private app: App;
  private stack: string[];
  private undoStack: string[];
  private redoStack: string[];
  private cache: LRUCache<string, string>;

  constructor(app: App) {
    this.app = app;
    this.stack = [];
    this.undoStack = [];
    this.redoStack = [];
    this.cache = new LRUCache({
      maxSize: 100 * 1024 * 1024,
    });
  }

  /**
   * 撤销
   */
  undo() {}
  /**
   * 重做
   */
  redo() {}
  /**
   * 保存状态
   */
  saveState() {
    const state = this.app.tree.toJSON();
    this.undoStack.push(JSON.stringify(state));
  }
  popState() {}
  cleanup() {}
}

export default HistoryTools;
