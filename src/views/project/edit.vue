<!-- @format -->

<template>
  <div class="edit-project">
    <el-form
      :model="form"
      :rules="rules"
      ref="projectForm"
      label-width="60px"
      class="edit-form"
    >
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item
            label="标题"
            prop="title"
          >
            <el-input
              v-model="form.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="摘要"
            prop="description"
          >
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.description"
              placeholder="请输入摘要"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="类别"
            prop="categoryId"
          >
            <el-select
              v-model="form.categoryId"
              filterable
              placeholder="请选择类别"
            >
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              > </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签">
            <tag-component
              v-for="(item, index) in tags"
              :key="index"
              :color="getColor(item.id)"
              :selected="form.tags.indexOf(item.id) !== -1"
              @click.native="toggleSelect(item.id)"
            >{{ item.content }}</tag-component>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="首图"
            prop="image"
          >
            <el-upload
              action="/api/project/upload"
              :on-success="uploadImageSuccess.bind(this)"
            >
              <el-image
                class="project-image"
                :src="form.image"
                v-if="form.image"
              >
              </el-image>
              <div
                v-else
                class="image-upload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击上传</div>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="editor-wrap">
      <editor
        ref="toastuiEditor"
        height="900px"
        initialEditType="markdown"
        previewStyle="vertical"
      />
    </div>
    <div class="btn-suspended-panel">
      <div
        class="btn-suspended-panel-btn"
        @click="submit"
      ><i class="el-icon-document-checked"></i></div>
      <el-upload
        action="/api/project/upload"
        :show-file-list="false"
        :on-success="uploadSuccess.bind(this)"
      >
        <div class="btn-suspended-panel-btn"><i class="el-icon-picture-outline-round"></i></div>
      </el-upload>

    </div>
  </div>
</template>
<script lang="ts">
/** @format */

import {Component, Vue} from 'vue-property-decorator'
import {namespace, State, Action} from 'vuex-class'
import {ActionMethod} from 'vuex'
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'

import TagComponent from '@/components/tag.vue'

import {Editor} from '@toast-ui/vue-editor'
import Project from '@/model/project'
import Category from '@/model/category'
import Tag from '@/model/tag'

const project = namespace('project')
const category = namespace('category')
const tag = namespace('tag')

import {COLOR_ARRAY} from '@/common/constant'
import {Loading, Catch} from '@/plugins/decorators'

@Component({components: {Editor, TagComponent}})
export default class Projects extends Vue {
  @project.State
  projectDetail: Project

  @project.Action('fetchDetail')
  fetchProjectDetail: ActionMethod

  @project.Action('submit')
  submitProject: ActionMethod

  @project.Action
  resetProjectDetail: ActionMethod

  @project.Mutation
  M_SET_ID: ActionMethod

  @category.State
  categories: Category

  @category.Action('fetchList')
  fetchCategoryList: ActionMethod

  @tag.State
  tags: Tag

  @tag.Action('fetchList')
  fetchTagList: ActionMethod

  $refs: any = {
    toastuiEditor: Editor
  }

  rules: object = {
    title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
    description: [{required: true, message: '请选择文章摘要', trigger: 'blur'}],
    categoryId: [{required: true, message: '请选择类别', trigger: 'change'}],
    image: [{required: true}]
  }

  form: Project.ProjectVo = {
    title: '',
    image: '',
    description: '',
    content: '',
    categoryId: null,
    tags: []
  }
  editorOptions: any = {}

  id: number = 0

  getColor(id: number) {
    let index = id % COLOR_ARRAY.length
    return COLOR_ARRAY[index]
  }

  /**
   * 文件上传成功后的回调函数
   */
  private uploadImageSuccess(res: any, file: File) {
    this.form.image = res
  }

  /**
   * 文件上传成功后的回调函数
   */
  private uploadSuccess(res: any, file: File) {
    this.$alert(res, '', {
      confirmButtonText: '确定',
      customClass: 'project-upload-success-modal'
    })
  }

  @Catch
  @Loading
  async created() {
    const {id = 0} = this.$route.params
    let projectId = Number(id) || 0
    await this.M_SET_ID(projectId)
    if (projectId) {
      await this.init()
    }
    await this.getCategoryList()
    await this.getTagList()
  }

  async init() {
    await this.fetchProjectDetail()
    if (this.projectDetail) {
      let project = this.projectDetail
      this.form = {
        title: project.title,
        image: project.image,
        description: project.description,
        content: project.content,
        categoryId: project.category.id,
        tags:
          project.tags && project.tags.length
            ? project.tags.map(item => {
                return item.id
              })
            : []
      }
      this.$refs.toastuiEditor.invoke('setHtml', project.content)
    }
  }

  async getCategoryList() {
    await this.fetchCategoryList()
  }

  async getTagList() {
    await this.fetchTagList()
  }

  toggleSelect(id: number) {
    let index = this.form.tags.indexOf(id)
    if (index !== -1) {
      this.form.tags.splice(index, 1)
    } else {
      this.form.tags.push(id)
    }
  }

  @Catch
  async submit() {
    this.$refs.projectForm.validate(async valid => {
      if (valid) {
        const content = this.$refs.toastuiEditor.invoke('getHtml')
        if (!content) {
          this.$message.error('内容不允许为空')
        } else {
          this.form.content = content
          let res = await this.submitProject(this.form)
          this.$router.push({name: 'ProjectDetail', params: {id: String(res)}})
        }
      }
    })
  }

  destroyed() {
    this.resetProjectDetail()
  }
}
</script>
<style lang="less" scoped>
/** @format */

.edit-project {
  background: #435c70;
  .edit-form {
    padding: 30px;
  }
  .image-upload {
    width: 300px;
    height: 150px;
    padding: 30px;
    background: #fff;
    border-radius: 10px;
    .el-icon-upload {
      font-size: 40px;
    }
  }
  .project-image {
    width: 100%;
    max-height: 280px;
  }
  .editor-wrap {
    padding: 30px;
    background: #fff;
    margin-bottom: 50px;
  }
}
</style>
<style lang="less">
/** @format */

.project-upload-success-modal .el-message-box__message p {
  word-break: break-all !important;
}
</style>
