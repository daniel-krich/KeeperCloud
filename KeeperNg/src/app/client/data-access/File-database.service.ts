import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export interface FileNode {
  filename: string;
  type: string;
  children: FileNode[];
}

/** Flat node with expandable and level information */
export interface FlatNode {
  expandable: boolean;
  filename: string;
  level: number;
  type: string;
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */
const TREE_DATA = `
    {
      "Applications": {
        "Calendar": "app",
        "Chrome": "app",
        "Webstorm": "app"
      },
      "Documents": {
        "angular": {
          "src": {
            "core": "folder",
            "compiler": "folder"
          }
        },
        "material2": {
          "src": {
            "button": "folder",
            "checkbox": "folder"
          }
        }
      },
      "Downloads": {
        "October": "folder",
        "November": "folder",
        "Tutorial": "folder"
      },
      "Pictures": {
        "Sun": "folder",
        "Woods": "folder",
        "Photo Booth Library": {
          "Pictures": "folder",
          "Videos": "folder"
        }
      }
    }
  `;

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabaseService {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    // Parse the string to json object.
    const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  buildFileTree(obj: any, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node: FileNode = { filename: key, type: '', children: [] };

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}